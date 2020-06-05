import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet'
import './styles.css';

import logo from '../../assets/logo.svg';

const CreatPoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form>
        <h1>Cadastro de ponto de coleta</h1>
        
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

            <div className="field">
              <label htmlFor="name">Nome</label>
              <input 
                type="text"
                name="name"
                id="name"
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input 
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                />
              </div>
            </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          
          <Map center={[-26.892553,-49.2334694]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-26.892553,-49.2334694]} />
          </Map>

          <div className="field-group">
              <div className="field">
                <label htmlFor="email">Estado (UF)</label>
                <select name="uf" id="uf">
                  <option value="">-- Selecione --</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Cidade</label>
                <select name="city" id="city">
                  <option value="">-- Selecione --</option>
                </select>
              </div>
            </div>

        </fieldset>
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaxo</span>
          </legend>
          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
              <span>Lâmpadas</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
              <span>Lâmpadas</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
              <span>Lâmpadas</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
              <span>Lâmpadas</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
              <span>Lâmpadas</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/lampadas.svg" alt="Lâmpadas"/>
              <span>Lâmpadas</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}

export default CreatPoint;