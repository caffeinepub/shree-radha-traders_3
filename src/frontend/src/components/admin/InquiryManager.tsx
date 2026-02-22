import { useGetAllInquiries } from '../../hooks/useQueries';
import InquiryCard from './InquiryCard';
import { Card, CardContent } from '@/components/ui/card';

export default function InquiryManager() {
  const { data: inquiries = [], isLoading } = useGetAllInquiries();

  const sortedInquiries = [...inquiries].sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-maroon">Inquiry Management</h2>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
        </div>
      ) : inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-maroon/60">
            <p>No inquiries yet. Customer inquiries will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedInquiries.map((inquiry) => (
            <InquiryCard key={inquiry.id} inquiry={inquiry} />
          ))}
        </div>
      )}
    </div>
  );
}
