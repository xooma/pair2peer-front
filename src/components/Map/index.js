/* eslint-disable react/jsx-filename-extension */
/* eslint-disable max-len */
// == Import npm
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Heading, Content } from 'react-bulma-components';
import axios from 'axios';
import { actions } from 'src/store/actions';
import { API_URI } from 'src/store/utils';

// == Import
import Loading from 'src/components/Loading';
import './style.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

// Composant React, toutes les définitions de variables et de fonctions doivent se trouver dedans
// On laisse à l'extérieur uniquement les imports/exports
const UserMap = () => {
  const { user } = useSelector((state) => state);
  // J'initie le state pour stocker les users en réponse de la requête axios
  // La première variables stocke les données, la deuxième sert à définir les données qui seront stockées dans la première
  const [users, setUsers] = useState();

  const dispatch = useDispatch();

  console.log(users);

  // Je définis une fonction pour faire la requête de mes users
  const getUsersData = () => {
    axios.get(`${API_URI}/map`)
      .then((res) => {
        // J'utilise mon state définit plus haut pour stocker les users que je reçois en réponse de la requête
        setUsers(res.data);
        dispatch({ type: actions.CLEAR_ERRORS_MSG });
        console.log(res.data);
      })
      .catch((err) => {
        // Au cas où erreur avec le serveur, renvoie un console.log
        console.log(err);
      });
  };

  // Hooks React qui permet de faire la requête pour les users à l'arrivée sur la page /map
  // Sert à plein d'autres choses aussi https://fr.reactjs.org/docs/hooks-effect.html
  useEffect(getUsersData, []);

  const UsersPopup = ({ userData }) => {
    if (user) {
      return (
        <Popup>
          <div>
            <Heading size={6}>{userData.pseudo}</Heading>
            <Heading subtitle size={6}>{userData.city}</Heading>
            <p>{(userData.remote) ? 'Préfère travailler en remote' : 'Privilégie la rencontre'}</p>
          </div>
        </Popup>
      );
    }
    return null;
  };

  // Rendu du composant, c'est ici que tout se passe

  // Le temps de la requêtes, users n'est pas défini
  // Pour éviter une erreur de rendu on fait un "conditionnal rendering"
  // Si users est vide
  if (!users) {
    return <Loading />;
  }

  return (
    <>
      <Content style={{ textAlign: 'center' }}>
        <Heading size={3}>Découvrez où sont éparpillés nos membres</Heading>
        <Heading subtitle size={6}>Mais où est Charlie ?</Heading>
      </Content>
      <Map className="map" center={[46.84664340683584, 2.4333]} zoom={6}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {users.map((userData) => (
            <Marker
              position={userData.localisation}
              key={userData.pseudo}
            >
              <UsersPopup userData={userData} />
            </Marker>
          ))}
        </MarkerClusterGroup>
      </Map>
    </>
  );
};

// On exporte pour le récupérer dans App/index.js
export default UserMap;
