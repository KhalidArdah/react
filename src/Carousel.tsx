import React from "react";
import { PetMedia, PetPhoto } from "petfinder-client";

interface CarouselState {
  photos: PetPhoto[],
  active: number
}

interface CarouselProps {
  media: PetMedia
}

class Carousel extends React.Component<CarouselProps, CarouselState> {
  public state: CarouselState = {
    photos: [],
    active: 0
  };
  public static getDerivedStateFromProps({ media }: CarouselProps) {
    let photos: PetPhoto[] = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter((photo: PetPhoto) => photo["@size"] === "pn");
    }

    return { photos };
  }
  public handleIndexClick = (event: React.MouseEvent<HTMLElement>) => {
    if(!(event.target instanceof HTMLElement)) {
      return;
    }
    if(event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index
      });
    }
  };
  public render() {
    const { photos, active } = this.state;

    let hero = "http://placecorgi.com/300/300";
    if (photos[active] && photos[active].value) {
      hero = photos[active].value;
    }

    return (
      <div className="carousel">
        <img src={hero} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            /* eslint-disable-next-line */
            <img
              onClick={this.handleIndexClick}
              data-index={index}
              key={photo.value}
              src={photo.value}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
