class revolverCarousel {
    /**
     * @type {NodeList}
     */
    cardList;
    /**
     * @type {CustomEvent}
     */
    rotateEvent;
    /**
     * Initialize carousel
     * @param {Node} object - container for cards
     */
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
                card.addEventListener('click', () => { this.rollingToSelectCard(card) })
                card.style.top = ((object.offsetHeight / 2) - (card.offsetHeight / 2)) + "px";
                card.style.left = ((object.offsetWidth / 2) - (card.offsetWidth / 2)) + "px";
                card.dispatchEvent(this.rotateEvent);
                object.append(this._createButtons(object.offsetHeight / 2, 10).next);
                object.append(this._createButtons(object.offsetHeight / 2, 10).prev);
            };
        }
        /**
         * Create two buttons for control
         * @param {number} top position top
         * @param {number} sides position left/right
         * @returns {object} created buttons
         */
    _createButtons(top, sides) {
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
        /**
         * Set card next position
         * @param {Node} card 
         */
    rotateCard(card) {
        let angle = card.dataset.position;
        let positionX = 0;
        let positionZ = 0;
        if (card.dataset.position == 0) { //toggle active status for first card
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
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
        if (card.dataset.position > 180) { //set card z-index (don't ask me what is 4000)
            card.style.zIndex = 4000 + +card.dataset.position - 360;
        } else {
            card.style.zIndex = 4000 - card.dataset.position;
        }
        card.style.transform = `perspective(1000px) translateX(${positionX * this.cardList.length}px) translateZ(${-positionZ * this.cardList.length}px)`
    };
    /**
     * Roll carousel once
     * @param {String} dir rotate direction "front" | "back"
     * @returns false if dir is invalid
     */
    rollCards(dir) {
        switch (dir) {
            case "front":
                for (let card of this.cardList) {
                    if (parseInt(card.dataset.position) <= 0) card.dataset.position = 360; //reset the value
                    card.dataset.position = parseInt(card.dataset.position) - (360 / this.cardList.length);
                    card.dispatchEvent(this.rotateEvent);
                };
                break;
            case "back":
                for (let card of this.cardList) {
                    card.dataset.position = parseInt(card.dataset.position) + (360 / this.cardList.length);
                    if (parseInt(card.dataset.position) >= 360) card.dataset.position = 0; //reset the value
                    card.dispatchEvent(this.rotateEvent);
                };
                break;
            default:
                return false;
        }
    };

    /**
     * Rilling card on first position
     * @param {object} card - card element
     */
    rollingToSelectCard(card) {
        if (card.dataset.position == 0) return;
        if (card.dataset.position <= 180) { //select rotate direction
            while (card.dataset.position != 0) {
                this.rollCards('back');
            }
        } else {
            while (card.dataset.position != 0) {
                this.rollCards('front');
            }
        }
    }
}