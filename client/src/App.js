import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { MainLayout } from "./layouts";
import { Authorisation, Help, Login, MainPage, Register, Room, Profile, AddAnnouncement, HelpDocuments, HelpStuff, HelpConditions,
  HelpLinks,
  ViewAnnouncement, RequestPasswordReset,
  RestorePassword, AdminRequests} from "./components";
import { apiService, setupInterceptors } from "./services";
import Residents from "./components/Residents/Residents";
import AdminRooms from "./components/AdminRooms/AdminRooms";
import {ResidentRequest} from "./components/ResidentRequest/ResidentRequest";
import {EditResident} from "./components/EditResident/EditResident";
import {EditRoom} from "./components/EditRoom/EditRoom";

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
          {/*<Route path='/verify' element={<Login/>}/>*/}
          <Route path='/request-password-reset' element={<RequestPasswordReset/>}/>
          <Route path='/restore-pass' element={<RestorePassword/>}/>
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
          <Route path='/appeals' element={<AdminRequests />}/>
          <Route path='/residents' element={<Residents />}/>
          <Route path='/rooms' element={<AdminRooms />}/>
          <Route path='/residentrequest' element={<ResidentRequest />}/>
          <Route path='/editresident' element={<EditResident />}/>
          <Route path='/editroom' element={<EditRoom />}/>





          <Route />
        </Route>
      </Routes>
    </>
  )
}