<template>
    <nav class="navbar">
      <h1>Mon Blog</h1>
      <div class="links">
        <router-link to="/">Accueil</router-link>
        <router-link to="/addPost">Ajouter un article</router-link>
      </div>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #52619c;
    padding: 15px 20px;
  }
  
  .navbar h1 {
    color: white;
  }
  
  .links {
    display: flex;
    gap: 15px;
  }
  
  .links a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  .links a:hover {
    text-decoration: underline;
  }
  </style>
  