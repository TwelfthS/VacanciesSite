import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from './header'
import SignUp from './signup'
import SignIn from './signin'
import Vacancies from './vacancies'
import VacancyPage from './vacancy'
import MyVacancies from './my-vacancies'
import ActiveVacancies from './active-vacancies'
import ActiveVacancyPage from './active-vacancy'
import CreateVacancy from "./create-vacancy"
import Home from './home'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp role={"Seeker"}/>} />
          <Route path="/company-signup" element={<SignUp role={"Employer"}/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/vacancies" element={<Vacancies />} />
          <Route path="/vacancies/:vacancyId" element={<VacancyPage my={false}/>} />
          <Route path="/my-vacancies" element={<MyVacancies />} />
          <Route path="/my-vacancies/:vacancyId" element={<VacancyPage my={true}/>} />
          <Route path="/active-vacancies" element={<ActiveVacancies />} />
          <Route path="/active-vacancies/:vacancyId" element={<ActiveVacancyPage />} />
          <Route path="/create-vacancy" element={<CreateVacancy />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
