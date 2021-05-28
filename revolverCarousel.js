class Card {
    cardList = "";
    rotateEvent = "";
    constructor(object) {
        this.cardList = object.querySelectorAll('.card');
        this.rotateEvent = new CustomEvent("rotate", {});
        let i = 0;
        for (let card of this.cardList) {
            card.dataset.position = i;
            i += 360 / this.cardList.length;
            card.addEventListener('rotate', e => {
                this.rotateCard(card);
            });
            card.style.top = ((object.offsetHeight / 2) - (card.offsetHeight / 2)) + "px";
            card.style.left = ((object.offsetWidth / 2) - (card.offsetWidth / 2)) + "px";
            card.dispatchEvent(this.rotateEvent);
            object.append(this.createButtons(object.offsetHeight / 2, 10).next);
            object.append(this.createButtons(object.offsetHeight / 2, 10).prev);
        };
    }
    createButtons(top, sides) {
        let nextButton = document.createElement('input');
        nextButton.type = "button";
        nextButton.value = "🢥";
        nextButton.style.position = 'absolute';
        nextButton.style.top = top + 'px';
        nextButton.style.right = sides + 'px';
        nextButton.className = "card-butoon";
        nextButton.addEventListener('click', e => {
            this.rollCards('front');
        });

        let prevButton = document.createElement('input');
        prevButton.type = "button";
        prevButton.value = "🢤";
        prevButton.style.position = 'absolute';
        prevButton.style.top = top + 'px';
        prevButton.style.left = sides + 'px';
        prevButton.className = "card-butoon";
        prevButton.addEventListener('click', e => {
            this.rollCards('back');
        });
        return {
            next: nextButton,
            prev: prevButton
        }
    }
    rotateCard(card) {
        let angle = card.dataset.position;
        let positionX = 0;
        let positionZ = 0;

        switch (true) {
            case (angle < 90):
                positionX = angle;
                positionZ = angle;
                break;
            case (180 >= angle && angle >= 90):
                positionX = 180 - angle;
                positionZ = angle;
                break;
            case (270 >= angle && angle >= 180):
                positionX = (180 - parseInt(angle));
                positionZ = 360 - angle;
                break;
            case (360 >= angle && angle >= 270):
                positionX = -(360 - parseInt(angle));
                positionZ = 360 - angle;
                break;
        }
        if (card.dataset.position > 180) {
            card.style.zIndex = 4000 + +card.dataset.position - 360;
        } else {
            card.style.zIndex = 4000 - card.dataset.position;
        }
        card.style.transform = `perspective(1000px) translateX(${positionX * this.cardList.length}px) translateZ(${-positionZ * this.cardList.length}px)`
    };
    rollCards(dir) {
        switch (dir) {
            case "front":
                for (let card of this.cardList) {
                    if (parseInt(card.dataset.position) <= 0) card.dataset.position = 360;
                    card.dataset.position = parseInt(card.dataset.position) - (360 / this.cardList.length);
                    card.dispatchEvent(this.rotateEvent);
                };
                break;
            case "back":
                for (let card of this.cardList) {
                    card.dataset.position = parseInt(card.dataset.position) + (360 / this.cardList.length);
                    if (parseInt(card.dataset.position) >= 360) card.dataset.position = 0;
                    card.dispatchEvent(this.rotateEvent);
                };
                break;
            default:
                return false;
        }
    };
}