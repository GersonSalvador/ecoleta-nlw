import React, {useState,useEffect, ChangeEvent, FormEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi'
import { Map, TileLayer, Marker } from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import axios from 'axios';
import './styles.css';

import logo from '../../assets/logo.svg';

interface Item{
  id:number,
  title: string,
  image_url: string
}

interface IBGEUFResponse {
  sigla: string
}
interface IBGECityResponse {
  nome: string
}

const CreatPoint = () => {

  //Array ou Objeto: setar manualmente o tipo de variável
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [citys, setCitys] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number,number]>([0,0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const history = useHistory();
  useEffect(() =>{
    api.get('items').then(response =>{
      setItems(response.data)
    })
  },[])

  useEffect(() =>{
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
      const ufInitials = response.data.map(uf => uf.sigla)
      setUfs(ufInitials);
    })
  },[])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      console.log(pos.coords)
      setInitialPosition([latitude, longitude])
    })
  },[])

  useEffect(() => {
    if(selectedUf === '0') return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response =>{
      const citysNames = response.data.map(uf => uf.nome)
      setCitys(citysNames);
    })

  }, [selectedUf])

  function handlerSelectUf(event: ChangeEvent<HTMLSelectElement>){
    setSelectedUf(event.target.value)
  }
  function handlerSelectCity(event: ChangeEvent<HTMLSelectElement>){
    setSelectedCity(event.target.value)
  }

  function handlerMapClick(event: LeafletMouseEvent){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target;

    setFormData({...formData, [name]: value})
  }

  function handleSelectItem(id: number){
    if(selectedItems.includes(id))
      setSelectedItems([...selectedItems.filter(i => i !== id)]);
    else
      setSelectedItems([...selectedItems, id])
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      uf: selectedUf,
      city: selectedCity,
      latitude: selectedPosition[0],
      longitude: selectedPosition[1],
      items: selectedItems
    }

    console.log(data)
    await api.post('points', data);

    alert('Ponto Cadastrado com Sucesso!');
    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>
        <Link to="/">
          <FiArrowLeft />
          Voltar para Home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
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
                onChange={handleInputChange}
              />
            </div>

            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input 
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input 
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>
          
          <Map center={initialPosition} zoom={15} onClick={handlerMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
              <div className="field">
                <label htmlFor="email">Estado (UF)</label>
                <select name="uf" id="uf" value={selectedUf} onChange={handlerSelectUf}>
                  <option value="0">-- Selecione --</option>
                  {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Cidade</label>
                <select name="city" id="city" value={selectedCity} onChange={handlerSelectCity}>
                  <option value="0">-- Selecione --</option>
                  {citys.map(city => <option key={city} value={city}>{city}</option>)}
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
            { 
              items.map((item) => (
                <li 
                  key={item.id} 
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title}/>
                  <span>{item.title}</span>
                </li>
              ))
            }
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}

export default CreatPoint;