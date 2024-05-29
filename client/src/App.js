import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { MainLayout } from "./layouts";
import { Authorisation, Help, Login, MainPage, Register, Room, Profile, AddAnnouncement, HelpDocuments, HelpStuff, HelpConditions,
  HelpLinks, 
  ViewAnnouncement} from "./components";
import { apiService, setupInterceptors } from "./services";

const SetupInterceptors = () => {
  const navigate = useNavigate();
  const logout = () => {};
  const [init, setInit] = useState(false);
  if (!init) {
    setupInterceptors(apiService, navigate, logout);
    setInit(true);
  }
  return <></>
}
export const App = () => {
  return (
    <>
      <SetupInterceptors />
      <Routes>
        <Route path={'/'} element={<MainLayout />}>
          <Route index element={<Navigate to={'/auth'} />} />

          <Route path="/auth" element={<Authorisation />} />
          <Route path="/main" element={<MainPage />} />
          <Route path='/sign-in' element={<Login/>}/>
          <Route path="/help" element={<Help />} />
          <Route path='/sign-up' element={<Register/>}/>
          <Route path='/room' element={<Room />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/addannouncement' element={<AddAnnouncement />}/>
          <Route path='/announcement/:id' element={<ViewAnnouncement />}/>
          <Route path='/helpdocuments' element={<HelpDocuments />}/>
          <Route path='/helpstuff' element={<HelpStuff />}/>
          <Route path='/helpconditions' element={<HelpConditions />}/>
          <Route path='/helplinks' element={<HelpLinks />}/>

          <Route />
        </Route>
      </Routes>
    </>
  )
}