export const throttle = (cb, delay = 15000) => {
    let shouldWait = false;

    return () => {
        if (shouldWait) return;
        cb();
        shouldWait = true;

        setTimeout(() => {
            shouldWait = false;
        }, delay);
    };
};
