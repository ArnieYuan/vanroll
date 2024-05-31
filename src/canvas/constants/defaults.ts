import { FabricObjectOption, WorkareaObject } from '../utils';

export const canvasOption = {
	preserveObjectStacking: true,
	width: 300,
	height: 150,
	selection: true,
	defaultCursor: 'default',
	backgroundColor: '#f3f3f3',
};

export const keyEvent = {
	move: true,
	all: true,
	copy: true,
	paste: true,
	esc: true,
	del: true,
	clipboard: false,
	transaction: true,
	zoom: true,
	cut: true,
	grab: true,
};

export const gridOption = {
	enabled: false,
	grid: 10,
	snapToGrid: false,
	lineColor: '#ebebeb',
	borderColor: '#cccccc',
};

export const workareaOption: Partial<WorkareaObject> = {
	width: 1080,
	height: 1920,
	workareaWidth: 1080,
	workareaHeight: 1920,
	lockScalingX: true,
	lockScalingY: true,
	scaleX: 1,
	scaleY: 1,
	backgroundColor: '#fff',
	hasBorders: false,
	hasControls: false,
	selectable: false,
	lockMovementX: true,
	lockMovementY: true,
	hoverCursor: 'default',
	name: '',
	id: 'workarea',
	type: 'image',
	link: {},
	tooltip: {
		enabled: false,
	},
	isElement: false,
};

export const objectOption: Partial<FabricObjectOption> = {
	rotation: 0,
	centeredRotation: true,
	strokeUniform: true,
};

export const guidelineOption = {
	enabled: true,
};

export const activeSelectionOption = {
	hasControls: true,
};

export const propertiesToInclude = ['id', 'name', 'locked', 'editable'];
