import { getAllDestinations } from '@/lib/db-actions';
import DestinationsClient from './DestinationsClient';

export const dynamic = 'force-dynamic';

export default async function DestinosPage() {
    const destinations = await getAllDestinations();
    return <DestinationsClient destinations={destinations} />;
}
