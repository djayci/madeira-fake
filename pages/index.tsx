import type { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import { Http } from '../src/services/http/http';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [name, setName] = useState<string>("");
  const [medicalId, setMedicalId] = useState<number>(0);

  const submit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await Http.post('/api/generate', { name, medicalId });
      window.location.pathname = `pdfs/${name}-${medicalId}.pdf`;
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form action="" className="flex mt-6" onSubmit={e => submit(e)}>
          <input type="text" placeholder="Nome" onChange={e => setName(e.target.value)} />
          <input type="number" placeholder="Numero Utente" onChange={e => setMedicalId(Number(e.target.value))} />
          <input type="submit" />
        </form>
      </main>
    </div >
  )
}

export default Home
