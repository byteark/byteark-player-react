import { Link } from 'react-router-dom';

export default function SiteHeader() {
  return (
    <header className='navbar navbar-light bg-light'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          ByteArk Player Container for React
        </Link>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link to='/' className='nav-link'>
              <span className='mr-1'>&#8592;</span>
              <span>Back to Home</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
