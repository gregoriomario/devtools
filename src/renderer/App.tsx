import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Navbar from './containers/Navbar';
import ImageResize from './containers/ImageResize';
import JSONToYaml from './containers/JSONToYaml';
import TimeConverter from './containers/TimeConverter';
import Content from './layout/Content';
import MainLayout from './layout/Main';

export default function App() {
  return (
    <Content className=" min-w-screen min-h-screen bg-slate-600 flex font-sans text-sm">
      <Router>
        <Navbar />
        <MainLayout title="JSON To YAML">
          <Routes>
            <Route path="/">
              <Route index element={<TimeConverter />} />
              <Route path="json" element={<JSONToYaml />} />
              <Route path="resize" element={<ImageResize />} />
            </Route>
          </Routes>
        </MainLayout>
      </Router>
    </Content>
  );
}

// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
// import icon from '../../assets/icon.svg';

// const Hello = () => {
//   return (
//     <div>
//       <div className="Hello">
//         <img width="200px" alt="icon" src={icon} />
//       </div>
//       <h1>electron-react-boilerplate</h1>
//       <div className="Hello">
//         <a
//           href="https://electron-react-boilerplate.js.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               📚
//             </span>
//             Read our docs
//           </button>
//         </a>
//         <a
//           href="https://github.com/sponsors/electron-react-boilerplate"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               🙏
//             </span>
//             Donate
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Hello />} />
//       </Routes>
//     </Router>
//   );
// }
