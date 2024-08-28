import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostList from "./pages/PostList";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import PostApp from "./pages/PostApp";
import Layout from "./pages/Layout";
import { AuthProvider } from "./pages/context/AuthContext";
import NotFound from "./components/NotFound/NotFound";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<PostApp />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/edit/:postId" element={<EditPost />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer position="top-center" />
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
