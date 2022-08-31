import React, { useEffect, useState } from "react";
import BasicData from "./components/BasicData";
import Abilities from "./components/Abilities";
import Moves from "./components/Moves";
import StatBar from "./components/StatBar";
import capitalize from "./modules/capitalize";
import "./styles.css";

function App() {
  const [pokemon, setPokemon] = useState({
    name: "",
    sprite: "",
    height: "",
    weight: "",
    typeOne: "",
    typeTwo: "",
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
    speciesUrl: "",
    desc: "",
    abilities: [],
    moves: [],
    abUrl: [],
    movesUrl: [],
  });

  const [count, setCount] = useState(1);

  useEffect(() => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${count}`)
      .then((res) => res.json())
      .then((pokemon) =>
        setPokemon((prev) => {
          return {
            ...prev,
            name: capitalize(pokemon.name),
            sprite: pokemon.sprites.other["official-artwork"].front_default,
            height: `${pokemon.height / 10} m`,
            weight: `${pokemon.weight / 10} kg`,
            typeOne: capitalize(pokemon.types[0].type.name),
            typeTwo: pokemon.types[1]
              ? capitalize(pokemon.types[1].type.name)
              : "",
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
            speciesUrl: pokemon.species.url,
            //
            abUrl:
              pokemon.abilities.map((x) => {
                return {
                  url: x.ability.url
                }
              }),

            movesUrl:
              pokemon.moves.map((x) => {
                return { url: x.move.url }
              })
          };
        })
      );
  }, [count]);

  useEffect(() => {

    let newArray = []
    for (let i = 0; i < pokemon.abUrl.length; i++) {
      fetch(`${pokemon.abUrl[i].url}`)
        .then((res) => res.json())
        .then((data) => {
          newArray.push({ name: data.name, text: data.effect_entries[1].effect })
          setPokemon(prev => {
            return {
              ...prev,
              abilities: newArray
            }
          })
        })
    }
  }, [pokemon.abUrl])

  useEffect(() => {

    let newArray = []
    for (let i = 0; i < pokemon.movesUrl.length; i++) {
      fetch(`${pokemon.movesUrl[i].url}`)
        .then((res) => res.json())
        .then((data) => {
          newArray.push({
            name: data.name, accuracy: data.accuracy,
            type: capitalize(data.type.name), pp: data.pp, power: data.power, desc: data.effect_entries[0].effect, dmgClass: data.damage_class.name
          })
          setPokemon(prev => {
            return {
              ...prev,
              moves: newArray
            }
          })
        })
    }
  }, [pokemon.movesUrl])


  useEffect(() => {

    fetch(`${pokemon.speciesUrl}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(prev => {
          return {
            ...prev,
            desc: data.flavor_text_entries[0].flavor_text
          }
        })
      })

  }, [pokemon.speciesUrl])


  function next() {
    if (count < 898) {
      setCount((prev) => prev + 1);
    } else {
      return
    }
  }

  function prev() {
    if (count <= 1) {
      return
    } else {
      setCount((prev) => prev - 1);
    }

  }


  return (
    <div className="App">

      <div className="top">

        <div className="left">
          <BasicData
            name={pokemon.name}
            desc={pokemon.desc}
            sprite={pokemon.sprite}
            typeOne={pokemon.typeOne}
            typeTwo={pokemon.typeTwo}
            height={pokemon.height}
            weight={pokemon.weight}
          />
          <div className="buttons">
            <button className="button" onClick={prev}>Prev</button>
            <button className="button" onClick={next}>Next</button>
          </div>
        </div>
        <div className="right">

          <div className="right-stats">

            <div className="base-stats-title"> Base Stats </div>
            <StatBar name="HP" stat={pokemon.hp} />
            <StatBar name="Atk" stat={pokemon.attack} />
            <StatBar name="Def" stat={pokemon.defense} />
            <StatBar name="SPA" stat={pokemon.specialAttack} />
            <StatBar name="SPD" stat={pokemon.specialDefense} />
            <StatBar name="Speed" stat={pokemon.speed} />

          </div>

          <div className="right-ability">
            <div className="ability-title">Abilities</div>
            <Abilities ability={pokemon.abilities} />
          </div>

        </div>

      </div>
      <Moves moves={pokemon.moves} />
    </div>
  );
}

export default App;
