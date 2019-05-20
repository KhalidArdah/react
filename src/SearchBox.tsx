import React from "react";
import { ANIMALS } from "petfinder-client";
import { connect } from "react-redux";
import getBreeds from "./actionCreators/getBreeds";
import changeAnimal from "./actionCreators/changeAnimal";
import changeLocation from "./actionCreators/changeLocaiton";
import changeBreed from "./actionCreators/changeBreed";
import { RouteComponentProps } from "@reach/router";

interface SearchRouterProps {
  location: string,
  animal: string,
  breeds: string[],
  breed: string
}

interface SearchProps extends RouteComponentProps<SearchRouterProps> {
  search: () => void
}

interface SearchDispatchProps {
  handleLocationChange: () => void,
  handleAnimalChange: () => void,
  handleBreedChange: () => void
}

class Search extends React.Component<SearchProps & SearchDispatchProps> {
  public handleFormSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    this.props.search();
  };
  public render() {
    return (
      <div className="search-params">
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="location">
            Location
            <input
              id="location"
              onChange={this.props.handleLocationChange}
              value={this.props.location}
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            Animal
            <select
              id="animal"
              value={this.props.animal}
              onChange={this.props.handleAnimalChange}
              onBlur={this.props.handleAnimalChange}
            >
              <option />
              {ANIMALS.map(animal => (
                <option key={animal} value={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              disabled={this.props.breeds && !this.props.breeds.length}
              id="breed"
              value={this.props.breed}
              onChange={this.props.handleBreedChange}
              onBlur={this.props.handleBreedChange}
            >
              <option />
              {this.props.breeds && this.props.breeds.map(breed => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ breed, breeds, animal, location }: SearchRouterProps) => ({
  breed,
  breeds,
  animal,
  location
})

const mapDispatchToProps = (dispatch: ({}: any) => void) => ({
  handleAnimalChange(event: any) {
    dispatch(changeAnimal(event.target.value))
    dispatch(getBreeds());
  },
  handleBreedChange(event: any) {
    dispatch(changeBreed(event.target.value))
  },
  handleLocationChange(event: any) {
    dispatch(changeLocation(event.target.value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search as any);
