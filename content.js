var state = {
    active: false,
    activate: function() {
        
    }, 
    deactivate: function() {

    },
    first: true,
    imgSrc: '',
    toggle: function() {
        this.active = !this.active;
        if (this.active) {
            initiate();
        } else {
            destroy();
        }
    }
};

function initiate() {
    newImage();
    screen.style['border'] = '5px solid black';
    document.addEventListener('mousemove', handleMove, true);
    document.addEventListener('scroll', newImage, true);
    document.addEventListener('resize', newImage, true);
}

function destroy() {
    screen.style['background-image'] = '';
    screen.style['border'] = '';
    document.removeEventListener('mousemove', handleMove, true);
    document.removeEventListener('scroll', newImage, true);
    document.removeEventListener('resize', newImage, true);
}

function newImage() {
    screen.style['background-image'] = '';
    chrome.runtime.sendMessage(state, function(response) {
        screen.style['background-image'] = 'url(' +response.imgSrc + ')';
    });
}

function handleMove(e) {
    screen.style.left = (e.clientX + 10).toString() + 'px';
    screen.style.top = (e.clientY + 10).toString() +'px';
    screen.style['background-position-x'] = (window.innerWidth - e.clientX).toString() + 'px';
    screen.style['background-position-y'] = (window.innerHeight - e.clientY).toString() + 'px';
    console.log(e);
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'click') {
        if (state.first) {
            window.screen = document.createElement('div');
            screen.style.position = 'fixed';
            screen.style.height = '200px';
            screen.style.width = '200px';
            screen.style.left = '50px';
            screen.style.top = '50px';
            screen.style['z-index'] = '2147483647'
            document.body.appendChild(screen);
            state.first = false;
        }
        state.toggle();
    }
    return true;
});