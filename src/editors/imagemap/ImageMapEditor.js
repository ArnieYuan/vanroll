import { Badge, Button, Menu, Layout, Spin } from 'antd';
import i18n from 'i18next';
import debounce from 'lodash/debounce';
import React, { useEffect, useRef, useReducer, useState, useContext } from 'react';
import Canvas from '../../canvas/Canvas';
import '../../libs/fontawesome-5.2.0/css/all.css';
import '../../styles/index.less';
import ImageMapConfigurations from './ImageMapConfigurations';
import ImageMapFooterToolbar from './ImageMapFooterToolbar';
import ImageMapHeaderToolbar from './ImageMapHeaderToolbar';
import ImageMapItems from './ImageMapItems';
import ImageMapPreview from './ImageMapPreview';
import ImageMapTitle from './ImageMapTitle';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import Timeline from './Timeline';

const propertiesToInclude = [
	'id',
	'name',
	'locked',
	'file',
	'src',
	'link',
	'tooltip',
	'animation',
	'workareaWidth',
	'workareaHeight',
	'videoLoadType',
	'autoplay',
	'shadow',
	'muted',
	'loop',
	'code',
	'icon',
	'userProperty',
	'trigger',
	'configuration',
	'superType',
	'points',
	'svg',
	'loadType',
];

const defaultOption = {
	stroke: 'rgba(255, 255, 255, 0)',
	strokeUniform: true,
	resource: {},
	link: {
		enabled: false,
		type: 'resource',
		state: 'new',
		dashboard: {},
	},
	tooltip: {
		enabled: true,
		type: 'resource',
		template: '<div>{{message.name}}</div>',
	},
	animation: {
		type: 'none',
		loop: true,
		autoplay: true,
		duration: 1000,
	},
	userProperty: {},
	trigger: {
		enabled: false,
		type: 'alarm',
		script: 'return message.value > 0;',
		effect: 'style',
	},
};

const ImageMapEditor = (props) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [zoomRatio, setZoomRatio] = useState(1);
	const [preview, setPreview] = useState(false);
	const [loading, showLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [animations, setAnimations] = useState([]);
	const [styles, setStyles] = useState([]);
	const [dataSources, setDataSources] = useState([]);
	const [descriptors, setDescriptors] = useState({});
	const { setObjects } = useContext(LocalStorageContext);
	const canvasRef = useRef();
	const itemsRef = useRef();

	useEffect(() => {
		showLoading(true);
		import('./Descriptors.json').then(descriptors => {
			setDescriptors(descriptors);
			setSelectedItem(null);
			showLoading(false);
		});
	}, []);

	const canvasHandlers = {
		onAdd: target => {
			// this.forceUpdate();
			if (target.type === 'activeSelection') {
				canvasHandlers.onSelect(null);
				return;
			}
			canvasRef.current.handler.select(target);
		},
		onSelect: target => {
			if (target && target.id && target.id !== 'workarea' && target.type !== 'activeSelection') {
				if (selectedItem && target.id === selectedItem.id) {
					return;
				}
				canvasRef.current.handler.getObjects().forEach(obj => {
					if (obj) {
						canvasRef.current.handler.animationHandler.resetAnimation(obj, true);
					}
				});
				setSelectedItem(target);
				return;
			}
			canvasRef.current.handler.getObjects().forEach(obj => {
				if (obj) {
					canvasRef.current.handler.animationHandler.resetAnimation(obj, true);
				}
			});
			setSelectedItem(null);
		},
		onRemove: () => {
			canvasHandlers.onSelect(null);
		},
		onModified: debounce(() => {
			// this.forceUpdate();
		}, 300),
		onZoom: zoom => {
			setZoomRatio(zoom);
		},
		onChange: (selectedItem, changedValues, allValues) => {
			const changedKey = Object.keys(changedValues)[0];
			const changedValue = changedValues[changedKey];
			if (allValues.workarea) {
				canvasHandlers.onChangeWokarea(changedKey, changedValue, allValues.workarea);
				return;
			}
			if (changedKey === 'width' || changedKey === 'height') {
				canvasRef.current.handler.scaleToResize(allValues.width, allValues.height);
				return;
			}
			if (changedKey === 'angle') {
				canvasRef.current.handler.rotate(allValues.angle);
				return;
			}
			if (changedKey === 'locked') {
				canvasRef.current.handler.setObject({
					lockMovementX: changedValue,
					lockMovementY: changedValue,
					hasControls: !changedValue,
					hoverCursor: changedValue ? 'pointer' : 'move',
					editable: !changedValue,
					locked: changedValue,
				});
				return;
			}
			if (changedKey === 'file' || changedKey === 'src' || changedKey === 'code') {
				if (selectedItem.type === 'image') {
					canvasRef.current.handler.setImageById(selectedItem.id, changedValue);
				} else if (selectedItem.superType === 'element') {
					canvasRef.current.handler.elementHandler.setById(selectedItem.id, changedValue);
				}
				return;
			}
			if (changedKey === 'link') {
				const link = Object.assign({}, defaultOption.link, allValues.link);
				canvasRef.current.handler.set(changedKey, link);
				return;
			}
			if (changedKey === 'tooltip') {
				const tooltip = Object.assign({}, defaultOption.tooltip, allValues.tooltip);
				canvasRef.current.handler.set(changedKey, tooltip);
				return;
			}
			if (changedKey === 'animation') {
				const animation = Object.assign({}, defaultOption.animation, allValues.animation);
				canvasRef.current.handler.set(changedKey, animation);
				return;
			}
			if (changedKey === 'icon') {
				const { unicode, styles } = changedValue[Object.keys(changedValue)[0]];
				const uni = parseInt(unicode, 16);
				if (styles[0] === 'brands') {
					canvasRef.current.handler.set('fontFamily', 'Font Awesome 5 Brands');
				} else if (styles[0] === 'regular') {
					canvasRef.current.handler.set('fontFamily', 'Font Awesome 5 Regular');
				} else {
					canvasRef.current.handler.set('fontFamily', 'Font Awesome 5 Free');
				}
				canvasRef.current.handler.set('text', String.fromCodePoint(uni));
				canvasRef.current.handler.set('icon', changedValue);
				return;
			}
			if (changedKey === 'shadow') {
				if (allValues.shadow.enabled) {
					if ('blur' in allValues.shadow) {
						canvasRef.current.handler.setShadow(allValues.shadow);
					} else {
						canvasRef.current.handler.setShadow({
							enabled: true,
							blur: 15,
							offsetX: 10,
							offsetY: 10,
						});
					}
				} else {
					canvasRef.current.handler.setShadow(null);
				}
				return;
			}
			if (changedKey === 'fontWeight') {
				canvasRef.current.handler.set(changedKey, changedValue ? 'bold' : 'normal');
				return;
			}
			if (changedKey === 'fontStyle') {
				canvasRef.current.handler.set(changedKey, changedValue ? 'italic' : 'normal');
				return;
			}
			if (changedKey === 'textAlign') {
				canvasRef.current.handler.set(changedKey, Object.keys(changedValue)[0]);
				return;
			}
			if (changedKey === 'trigger') {
				const trigger = Object.assign({}, defaultOption.trigger, allValues.trigger);
				canvasRef.current.handler.set(changedKey, trigger);
				return;
			}
			if (changedKey === 'filters') {
				const filterKey = Object.keys(changedValue)[0];
				const filterValue = allValues.filters[filterKey];
				if (filterKey === 'gamma') {
					const rgb = [filterValue.r, filterValue.g, filterValue.b];
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						gamma: rgb,
					});
					return;
				}
				if (filterKey === 'brightness') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						brightness: filterValue.brightness,
					});
					return;
				}
				if (filterKey === 'contrast') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						contrast: filterValue.contrast,
					});
					return;
				}
				if (filterKey === 'saturation') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						saturation: filterValue.saturation,
					});
					return;
				}
				if (filterKey === 'hue') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						rotation: filterValue.rotation,
					});
					return;
				}
				if (filterKey === 'noise') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						noise: filterValue.noise,
					});
					return;
				}
				if (filterKey === 'pixelate') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						blocksize: filterValue.blocksize,
					});
					return;
				}
				if (filterKey === 'blur') {
					canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey].enabled, {
						value: filterValue.value,
					});
					return;
				}
				canvasRef.current.handler.imageHandler.applyFilterByType(filterKey, changedValue[filterKey]);
				return;
			}
			canvasRef.current.handler.set(changedKey, changedValue);
		},
		onChangeWokarea: (changedKey, changedValue, allValues) => {
			if (changedKey === 'file' || changedKey === 'src') {
				canvasRef.current.handler.workareaHandler.setImage(changedValue);
				return;
			}
			if (changedKey === 'width' || changedKey === 'height') {
				canvasRef.current.handler.originScaleToResize(
					canvasRef.current.handler.workarea,
					allValues.width,
					allValues.height,
				);
				canvasRef.current.canvas.centerObject(canvasRef.current.handler.workarea);
				return;
			}
			canvasRef.current.handler.workarea.set(changedKey, changedValue);
			canvasRef.current.canvas.requestRenderAll();
		},
		onTooltip: (ref, target) => {
			const value = Math.random() * 10 + 1;
			return (
				<div>
					<div>
						<div>
							<Button>{target.id}</Button>
						</div>
						<Badge count={value} />
					</div>
				</div>
			);
		},
		onClick: (canvas, target) => {
			const { link } = target;
			if (link.state === 'current') {
				document.location.href = link.url;
				return;
			}
			window.open(link.url);
		},
		onContext: (ref, event, target) => {
			if ((target && target.id === 'workarea') || !target) {
				const { layerX: left, layerY: top } = event;
				return (
					<Menu>
						<Menu.SubMenu key="add" style={{ width: 120 }} title={i18n.t('action.add')}>
							{transformList().map(item => {
								const option = Object.assign({}, item.option, { left, top });
								const newItem = Object.assign({}, item, { option });
								return (
									<Menu.Item style={{ padding: 0 }} key={item.name}>
										{itemsRef.current.renderItem(newItem, false)}
									</Menu.Item>
								);
							})}
						</Menu.SubMenu>
					</Menu>
				);
			}
			if (target.type === 'activeSelection') {
				return (
					<Menu>
						<Menu.Item
							onClick={() => {
								canvasRef.current.handler.toGroup();
							}}
						>
							{i18n.t('action.object-group')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								canvasRef.current.handler.duplicate();
							}}
						>
							{i18n.t('action.clone')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								canvasRef.current.handler.remove();
							}}
						>
							{i18n.t('action.delete')}
						</Menu.Item>
					</Menu>
				);
			}
			if (target.type === 'group') {
				return (
					<Menu>
						<Menu.Item
							onClick={() => {
								canvasRef.current.handler.toActiveSelection();
							}}
						>
							{i18n.t('action.object-ungroup')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								canvasRef.current.handler.duplicate();
							}}
						>
							{i18n.t('action.clone')}
						</Menu.Item>
						<Menu.Item
							onClick={() => {
								canvasRef.current.handler.remove();
							}}
						>
							{i18n.t('action.delete')}
						</Menu.Item>
					</Menu>
				);
			}
			return (
				<Menu>
					<Menu.Item
						onClick={() => {
							canvasRef.current.handler.duplicateById(target.id);
						}}
					>
						{i18n.t('action.clone')}
					</Menu.Item>
					<Menu.Item
						onClick={() => {
							canvasRef.current.handler.removeById(target.id);
						}}
					>
						{i18n.t('action.delete')}
					</Menu.Item>
				</Menu>
			);
		},
		onTransaction: transaction => {
			// this.forceUpdate();
		},
	};

	const handlers = {
		onChangePreview: checked => {
			setObjects(getObjects());
			setPreview(typeof checked === 'object' ? false : checked);
		},
		onProgress: progress => { setProgress(progress); },
		onImport: files => {
			if (files) {
				showLoading(true);
				setTimeout(() => {
					const reader = new FileReader();
					reader.onprogress = e => {
						if (e.lengthComputable) {
							const progress = parseInt((e.loaded / e.total) * 100, 10);
							handlers.onProgress(progress);
						}
					};
					reader.onload = e => {
						const { objects, animations, styles, dataSources } = JSON.parse(e.target.result);
						setAnimations(animations);
						setStyles(styles);
						setDataSources(dataSources);
						if (objects) {
							canvasRef.current.handler.clear(true);
							const data = objects.filter(obj => {
								if (!obj.id) {
									return false;
								}
								return true;
							});
							canvasRef.current.handler.importJSON(data);
						}
					};
					reader.onloadend = () => {
						showLoading(false);
					};
					reader.onerror = () => {
						showLoading(false);
					};
					reader.readAsText(files[0]);
				}, 500);
			}
		},
		onUpload: () => {
			const inputEl = document.createElement('input');
			inputEl.accept = '.json';
			inputEl.type = 'file';
			inputEl.hidden = true;
			inputEl.onchange = e => {
				handlers.onImport(e.target.files);
			};
			document.body.appendChild(inputEl); // required for firefox
			inputEl.click();
			inputEl.remove();
		},
		onDownload: () => {
			showLoading(true);
			const exportDatas = {
				objects: getObjects(),
				animations,
				styles,
				dataSources,
			};
			const anchorEl = document.createElement('a');
			anchorEl.href = `data:text/json;charset=utf-8,${encodeURIComponent(
				JSON.stringify(exportDatas, null, '\t'),
			)}`;
			anchorEl.download = `${canvasRef.current.handler.workarea.name || 'sample'}.json`;
			document.body.appendChild(anchorEl); // required for firefox
			anchorEl.click();
			anchorEl.remove();
			showLoading(false);
		},
		onChangeAnimations: animations => { setAnimations(animations); },
		onChangeStyles: styles => { setStyles(styles); },
		onChangeDataSources: dataSources => { setDataSources(dataSources); },
		onSaveImage: () => {
			canvasRef.current.handler.saveCanvasImage();
		},
	};

	const transformList = () => {
		return Object.values(descriptors).reduce((prev, curr) => prev.concat(curr), []);
	};

	// Call it whenever leaving the editor.
	const getObjects = () => {
		if (canvasRef.current) {
			const objects = canvasRef.current.handler.exportJSON().filter(obj => {
				if (!obj.id) {
					return false;
				}
				return true;
			});
			return objects;
		}
		return [];
	};

	// Reducer function to update state based on actions
	const stateReducer = (state, action) => {
		switch (action.type) {
			case 'download':
				handlers.onDownload();
				return state;
			case 'upload':
				handlers.onUpload();
				return state;
			case 'image-save':
				handlers.onSaveImage();
				return state;
			default:
				return state;
		}
	};
	const [state, dispatch] = useReducer(stateReducer, {});
	const title = <ImageMapTitle dispatch={dispatch} />;
	const content = (
		<div className="rde-editor">
			<ImageMapItems
				ref={itemsRef}
				canvasRef={canvasRef.current}
				descriptors={descriptors}
			/>
			<div className="rde-editor-canvas-container">
				<div className="rde-editor-header-toolbar">
					<ImageMapHeaderToolbar
						canvasRef={canvasRef.current}
						selectedItem={selectedItem}
						onSelect={canvasHandlers.onSelect}
					/>
				</div>
				<div className="rde-editor-canvas">
					<Canvas
						ref={canvasRef}
						className="rde-canvas"
						minZoom={1}
						maxZoom={500}
						objectOption={defaultOption}
						propertiesToInclude={propertiesToInclude}
						onModified={canvasHandlers.onModified}
						onAdd={canvasHandlers.onAdd}
						onRemove={canvasHandlers.onRemove}
						onSelect={canvasHandlers.onSelect}
						onZoom={canvasHandlers.onZoom}
						onTooltip={canvasHandlers.onTooltip}
						onClick={canvasHandlers.onClick}
						onContext={canvasHandlers.onContext}
						onTransaction={canvasHandlers.onTransaction}
						keyEvent={{
							transaction: true,
						}}
						canvasOption={{
							selectionColor: 'rgba(8, 151, 156, 0.3)',
						}}
					/>
				</div>
				<div className="rde-editor-footer-toolbar">
					<ImageMapFooterToolbar
						canvasRef={canvasRef.current}
						preview={preview}
						onChangePreview={handlers.onChangePreview}
						zoomRatio={zoomRatio}
					/>
				</div>
			</div>
			<ImageMapConfigurations
				canvasRef={canvasRef.current}
				onChange={canvasHandlers.onChange}
				selectedItem={selectedItem}
				onChangeAnimations={handlers.onChangeAnimations}
				onChangeStyles={handlers.onChangeStyles}
				onChangeDataSources={handlers.onChangeDataSources}
				animations={animations}
				styles={styles}
				dataSources={dataSources}
			/>
			<ImageMapPreview
				preview={preview}
				onChangePreview={handlers.onChangePreview}
				onTooltip={canvasHandlers.onTooltip}
				onClick={canvasHandlers.onClick}
			/>
		</div>
	);
	return (
	<Spin spinning={loading}>
		<Layout className="rde-content-layout">
			{title}
			<Layout
				style={{
					overflowY: 'auto',
					overflowX: 'hidden',
					minHeight: `calc(100vh - ${title ? 98 : 60}px)`,
					height: `calc(100vh - ${title ? 98 : 60}px)`,
				}}
				className='rde-content-layout-main'
			>
				{content}
			</Layout>
			<Timeline />
		</Layout>
	</Spin>);
}

export default ImageMapEditor;
