import Link from "next/link";

export const Header: React.FC = () => (
  <header>
    <h1>
      <Link href="/">Oliver Joseph Ash</Link>
    </h1>
    <ul>
      <li>Northamptonshire, UK</li>
      <li>
        Web at <a href="https://unsplash.com/">Unsplash</a>
      </li>
      <li>
        <a href="https://twitter.com/OliverJAsh">Twitter</a>
      </li>
      <li>
        <a href="https://github.com/OliverJAsh">GitHub</a>
      </li>
    </ul>
  </header>
);
