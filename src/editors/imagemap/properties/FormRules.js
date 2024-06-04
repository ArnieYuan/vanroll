export const booleanRules = [
    {
        type: 'boolean',
    },
];

export const widthRules = [
    {
        type: 'number',
        required: true,
        message: 'Please input width',
        min: 1,
    },
];

export const heightRules = [
    {
        type: 'number',
        required: true,
        message: 'Please input height',
        min: 1,
    },
];

export const leftRules = [
    {
        required: true,
        message: 'Please input x position',
    },
];

export const topRules = [
    {
        required: true,
        message: 'Please input y position',
    },
];

export const angleRules = [
    {
        type: 'number',
        required: true,
        message: 'Please input rotation',
    },
];

export const shadowBlurRules =[
    {
        type: 'number',
        min: 0,
        max: 100,
    },
];

export const shadowOffsetRules = [
    {
        type: 'number',
        min: 0,
        max: 100,
    },
];