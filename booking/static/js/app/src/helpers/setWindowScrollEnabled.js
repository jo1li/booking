const setWindowScrollEnabled = (canScroll) => {
    // Best stopgap we have found to prevent the window scrolling when
    // the user drags a draggable item within a modal.
    const htmlTag = document.getElementsByTagName('html')[0];
    const scrolledPosition = htmlTag.scrollTop;
    const style = `position: fixed; top: -${scrolledPosition}px; left: 0; bottom: 0; right: 0;`;

    // NB if we ever need to set styles on the body elsewhere,
    // we will have to update this.
    document.body.setAttribute('style', canScroll ? '' : style);

    // Trigger scroll event for elements that relocate themselves on scroll
    window.scrollTo(window.scrollX, window.scrollY);
};

export default setWindowScrollEnabled;
