import React from "react";
import pf, { Pet as PetClass } from "petfinder-client";
import Pet from "./Pet";
import SearchBox from "./SearchBox";
import { connect } from "react-redux";

const petfinder = pf({
  key: process.env.API_KEY || "",
  secret: process.env.API_SECRET || ""
});

interface ResultsProps {
  location: string,
  animal: string,
  breed: string
}
class Results extends React.Component<ResultsProps> {
  public state = {
    pets: []
  };
  
  public componentDidMount() {
    this.search();
  }
  public search = () => {
    petfinder.pet
      .find({
        location: this.props.location,
        animal: this.props.animal,
        breed: this.props.breed,
        output: "full"
      })
      .then(data => {
        let pets: PetClass[];
        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }
        this.setState({
          pets
        });
      });
  };
  public render() {
    return (
      <div className="search">
        <SearchBox search={this.search} />
        {this.state.pets.map((pet: PetClass) => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={breed}
              media={pet.media}
              location={`${pet.contact.city}, ${pet.contact.state}`}
              id={pet.id}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ location, breed, animal }: ResultsProps) => ({
  location,
  breed,
  animal
})

export default connect(mapStateToProps)(Results);