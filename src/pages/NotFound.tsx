import { Link } from 'react-router-dom';
import { Page, PageHeader } from '../components/Layout';

export default function NotFound() {
  return (
    <Page>
      <PageHeader title="Page not found">That page doesn’t exist — it may have moved in the 2026 update.</PageHeader>
      <div className="flex gap-2">
        <Link to="/" className="btn-primary">
          Home
        </Link>
        <Link to="/search" className="btn-ghost">
          Search
        </Link>
      </div>
    </Page>
  );
}
