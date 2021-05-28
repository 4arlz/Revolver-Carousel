# Revolver Carousel
## _Simple slider vanila JS powered_

Revolver Carousel is a simple slider, similar to a carousel.

![Screenshot](https://github.com/4arlz/Revolver-Carousel/blob/master/img/image.jpg)

## Installation
- In the html document you need some container for your cards.
- The card mast have a class "card" and empty data-position=""

HTML
```sh
<div id="container"> 
    <div class="card" data-position="">
    //your code
    </div>
    
    <div class="card" data-position="">
    //your code
    </div>
</div>
<script src="https://cdn.jsdelivr.net/gh/4arlz/Revolver-Carousel/revolverCarousel.js"></script>
```
https://cdn.jsdelivr.net/gh/4arlz/Revolver-Carousel/revolverCarousel.js

JS

After impоrt initialize a new instance of the class

```sh
let card = new Card(document.getElementById('container'));
```
> Note: the "Card" class constructor needs the object of your container.


## Public methods

Оnly one method is currently available

```sh
card.rollCards("front" | "back"); 
```
Rolling cards for next or prev.

**Thanks for your attention!**