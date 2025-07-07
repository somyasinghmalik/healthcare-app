import React from 'react';
import './Doctors.css';

import MeenaIyer from '../assets/doctors/Meena_iyer.png';
import VinaySingh from '../assets/doctors/Vinay_singh.png';
import ArjunKhanna from '../assets/doctors/Arjun_khanna.png';
import SnehaDas from '../assets/doctors/Sneha_das.png';
import NeerajGupta from '../assets/doctors/Neeraj_gupta.png';
import KavitaRao from '../assets/doctors/Kavita_rao.png';
import AnilKapoor from '../assets/doctors/Anil_kapoor.png';
import PriyaVerma from '../assets/doctors/Priya_verma.png';
import RohanMehta from '../assets/doctors/Rohan_mehta.png';
import AliceSharma from '../assets/doctors/Alice_sharma.png';

const doctors = [
  {
    name: 'Dr. Meena Iyer',
    specialty: 'ENT Specialist',
    image: MeenaIyer,
    description: 'Dr. Meena Iyer is an ENT (Ear, Nose, Throat) specialist skilled in treating sinus issues, throat infections, hearing loss, and voice problems. Her precise diagnosis, minimally invasive treatments, and preventive tips have made her a preferred ENT expert for all age groups.'
  },
  {
    name: 'Dr. Vinay Singh',
    specialty: 'General Physician',
    image: VinaySingh,
    description: 'Dr. Vinay Singh is a versatile general physician who provides everyday care, chronic disease management, and lifestyle guidance. From colds and flu to diabetes and hypertension, he ensures comprehensive checkups with a friendly, professional approach.'
  },
  {
    name: 'Dr. Arjun Khanna',
    specialty: 'Psychiatrist',
    image: ArjunKhanna,
    description: 'Dr. Arjun Khanna is a thoughtful psychiatrist helping patients navigate anxiety, depression, trauma, and stress disorders. He integrates psychotherapy with medical management to create a safe healing space and encourages openness and emotional growth.'
  },
  {
    name: 'Dr. Sneha Das',
    specialty: 'Gynecologist',
    image: SnehaDas,
    description: 'Dr. Sneha Das is a dedicated gynecologist focused on women\'s health across all stages of life. From menstrual health to pregnancy care and menopause, she offers holistic support with dignity and sensitivity.'
  },
  {
    name: 'Dr. Neeraj Gupta',
    specialty: 'Oncologist',
    image: NeerajGupta,
    description: 'Dr. Neeraj Gupta is a compassionate oncologist devoted to providing comprehensive cancer care. He combines chemotherapy, targeted therapy, and emotional support to create personalized treatment paths and simplify complex medical journeys.'
  },
  {
    name: 'Dr. Kavita Rao',
    specialty: 'Pediatrician',
    image: KavitaRao,
    description: 'With a kind and playful spirit, Dr. Kavita Rao is a pediatrician who children adore and parents trust. She is an expert in newborn care, childhood vaccinations, developmental assessments, and nutritional guidance.'
  },
  {
    name: 'Dr. Anil Kapoor',
    specialty: 'Orthopedic',
    image: AnilKapoor,
    description: 'Dr. Anil Kapoor is a leading orthopedic specialist focused on restoring mobility and relieving joint and bone pain. His treatments cover sports injuries, arthritis, fractures, and spinal issues using both surgical and non-surgical techniques.'
  },
  {
    name: 'Dr. Priya Verma',
    specialty: 'Dermatologist',
    image: PriyaVerma,
    description: 'Dr. Priya Verma is a trusted dermatologist known for her gentle care and holistic solutions for skin, hair, and nail concerns. She specializes in acne treatment, eczema management, cosmetic dermatology, and laser therapies.'
  },
  {
    name: 'Dr. Rohan Mehta',
    specialty: 'Neurologist',
    image: RohanMehta,
    description: 'Dr. Rohan Mehta is a renowned neurologist who brings a decade of expertise in treating disorders of the brain, spinal cord, and nervous system. From epilepsy to Parkinson’s, he offers calm, clear diagnosis and evidence-based care.'
  },
  {
    name: 'Dr. Alice Sharma',
    specialty: 'Cardiologist',
    image: AliceSharma,
    description: 'Dr. Alice Sharma is a highly accomplished cardiologist with over 15 years of experience in diagnosing and treating complex heart conditions. She specializes in preventive cardiology, interventional procedures, and cardiac rehabilitation.'
  },
];

const Doctors = () => {
  return (
    <div className="doctors-container">
      <h1 className="doctors-title">Meet Our Doctors</h1>
      <div className="doctors-grid">
        {doctors.map((doc, idx) => (
          <div key={idx} className="doctor-card">
            <img src={doc.image} alt={doc.name} />
            <h3 className="doctor-name">{doc.name}</h3>
            <p className="doctor-specialty">{doc.specialty}</p>
            <p className="doctor-description">{doc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
