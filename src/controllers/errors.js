// BASIC ERRORS

const ErrElemNotFound = new Error('Element not found to set controller');

// MOVE CONTROLLER ERRORS

const ErrTargetIsUnmovable = new Error('Target is unmovable');

// ROTATE CONTROLLER ERRORS

const ErrTargetIsUnrotatable = new Error('Target is unrotatable');


export {
    ErrElemNotFound,
    ErrTargetIsUnmovable,
    ErrTargetIsUnrotatable,
}