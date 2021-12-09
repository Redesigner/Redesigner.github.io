class Gallery
{
    constructor(rootElement, slotCount)
    {
        this.slotCount = slotCount;
        this.slotOffset = 0;

        var intendedSlotCount = this.slotCount;

        var exhibitElement = rootElement;
        var exhibitMainDisplay = exhibitElement.getElementsByClassName('primary')[0];
        var miniGalleryElement = exhibitElement.getElementsByClassName('mini-gallery')[0];

        var meta = imageSrcRaw = exhibitElement.getElementsByClassName('srccontainer')[0];

        var title = meta.getAttribute('title');

        var imageSrcRaw = meta.getAttribute('url');
        this.imageSrc = imageSrcRaw.split(';');

        exhibitMainDisplay.setAttribute('src', '/images/' + title + '/' + this.imageSrc[0].trim());

        if (this.imageSrc.length > intendedSlotCount)
        {
            slotCount -= 1;
            this.slotCount -= 1;

            var leftArrow = document.createElement('li');
            leftArrow.textContent = "<";
            leftArrow.setAttribute('class', 'arrow');

            let gallery = this;
            leftArrow.addEventListener('click', function() {
                gallery.shiftSlots(-1)
            });

            miniGalleryElement.appendChild(leftArrow);
        }

        this.gallerySlots = Array(slotCount);
        for (var i = 0; i < slotCount; i++)
        {
            var miniGalleryListItem = document.createElement('li');
            miniGalleryListItem.setAttribute('class', 'gallery-item');
            this.gallerySlots[i] = miniGalleryListItem;
            miniGalleryElement.appendChild(miniGalleryListItem);
        }

        this.galleryItems = new Array(this.imageSrc.length);

        console.log("Loaded " + this.imageSrc.length + " images for mini-gallery.");

        for (var i = 0; i < this.imageSrc.length; i++)
        {
            var imageElement = document.createElement("img");

            let clickTarget = exhibitMainDisplay;
            let localSrc = '/images/' + title + '/' + this.imageSrc[i].trim();
            imageElement.setAttribute('src', localSrc);
            imageElement.addEventListener("click", function(){
                onButtonClickEvent(clickTarget, localSrc);
            });

            this.galleryItems[i] = imageElement;
            if (i < slotCount)
            {
                this.gallerySlots[i].appendChild(imageElement);
            }
        }

        if (this.imageSrc.length > intendedSlotCount)
        {
            var rightArrow = document.createElement('li');
            rightArrow.textContent = ">";
            rightArrow.setAttribute('class', 'arrow');

            let gallery = this;
            rightArrow.addEventListener('click', function() {
                gallery.shiftSlots(1)
            });

            miniGalleryElement.appendChild(rightArrow);
        }
    }

    shiftSlots(amount)
    {
        this.slotOffset = (this.slotOffset + amount) % (this.galleryItems.length);
        if (this.slotOffset < 0)
        {
            this.slotOffset += this.slotCount + 1;
        }
        // console.log("New slot offset is " + this.slotOffset);
        for(var i = 0; i < this.slotCount; i++)
        {
            var oldImage = this.gallerySlots[i].getElementsByTagName('img')[0];
            if (oldImage != null)
            {
                this.gallerySlots[i].removeChild(oldImage);
            }
            this.gallerySlots[i].appendChild(this.galleryItems[(this.slotOffset + i) % (this.galleryItems.length)]);
        }
    }
}

function onButtonClickEvent(owner, src)
{
    owner.setAttribute("src", src);
}

var galleries = document.getElementsByClassName('exhibit');
for (var i = 0; i < galleries.length; i++)
{
    new Gallery(galleries[i], 5);
}