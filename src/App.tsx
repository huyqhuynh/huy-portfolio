import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import EmailLab from './components/EmailLab'
import Experience from './components/Experience'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Skills />
        <Projects />
        <EmailLab />
        <Experience />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
