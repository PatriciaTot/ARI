import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Component1 from './components/Component1';
import { useParams } from "react-router-dom";

// Composant stage individuel
function StageRow({ stage }) {
  return (
    <tr>
      <td>{stage.name}</td>
      <td>{stage.description}</td>
      <td>{stage.company}</td>
      <td>
        <button>Edit</button>
        <button>Read</button>
        <button>Delete</button>
      </td>
    </tr>
  );
}

// Composant liste des stages
function StageTable({ stages }) {
  const rows = stages.map((stage) => (
    <StageRow
      stage={stage}
      key={stage.id}
    />
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Entreprise</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// Composant barre de recherche et filtres
function SearchBar({ filter, onFilterChange, searchTerm, onSearchChange }) {
  return (
    <form>
      <input 
        type="text" 
        placeholder="Rechercher un stage..." 
        value={searchTerm} 
        onChange={e => onSearchChange(e.target.value)} 
      />
      <div>
        <label>
          <input 
            type="radio" 
            value="all" 
            checked={filter === 'all'} 
            onChange={() => onFilterChange('all')} 
          />
          Tous les stages
        </label>
        <label>
          <input 
            type="radio" 
            value="disponible" 
            checked={filter === 'disponible'} 
            onChange={() => onFilterChange('disponible')} 
          />
          Disponibles
        </label>
        <label>
          <input 
            type="radio" 
            value="affecté" 
            checked={filter === 'affecté'} 
            onChange={() => onFilterChange('affecté')} 
          />
          Affectés
        </label>
        <label>
          <input 
            type="radio" 
            value="terminé" 
            checked={filter === 'terminé'} 
            onChange={() => onFilterChange('terminé')} 
          />
          Terminés
        </label>
      </div>
    </form>
  );
}

// Composant principal qui contient la logique du filtrage et de recherche
function FilterableStageTable({ stages }) {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // Filtrer les stages en fonction de la recherche et du filtre sélectionné
  const filteredStages = stages.filter(stage => {
    const matchesFilter = filter === 'all' || stage.status === filter;
    const matchesSearch = stage.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <SearchBar
        filter={filter} 
        onFilterChange={handleFilterChange} 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
      />
      <button>Créer un Stage</button>
      <StageTable stages={filteredStages} />
    </div>
  );
}

// Liste statique des stages
const STAGES = [
  { id: 1, name: "Stage en développement web", description: "Développement d'une application React", company: "TechCorp", status: "disponible" },
  { id: 2, name: "Stage en data science", description: "Analyse de données", company: "DataCo", status: "affecté" },
  { id: 3, name: "Stage en marketing digital", description: "Marketing sur les réseaux sociaux", company: "MarketPro", status: "terminé" },
];

// Composant principal de l'application
export default function App() {
  return <FilterableStageTable stages={STAGES} />;
}
