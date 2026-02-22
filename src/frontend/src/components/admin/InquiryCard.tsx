import { useUpdateInquiryStatus, useDeleteInquiry } from '../../hooks/useQueries';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Phone, MessageSquare } from 'lucide-react';
import { InquiryStatus } from '../../backend';
import type { Inquiry } from '../../backend';

interface InquiryCardProps {
  inquiry: Inquiry;
}

export default function InquiryCard({ inquiry }: InquiryCardProps) {
  const updateStatus = useUpdateInquiryStatus();
  const deleteInquiry = useDeleteInquiry();

  const handleStatusChange = async (status: string) => {
    const statusMap: Record<string, InquiryStatus> = {
      new: InquiryStatus.new_,
      inProgress: InquiryStatus.inProgress,
      resolved: InquiryStatus.resolved,
      archived: InquiryStatus.archived,
    };

    await updateStatus.mutateAsync({ inquiryId: inquiry.id, status: statusMap[status] });
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      await deleteInquiry.mutateAsync(inquiry.id);
    }
  };

  const getStatusBadge = (status: InquiryStatus) => {
    const statusConfig = {
      [InquiryStatus.new_]: { label: 'New', className: 'bg-gold text-maroon' },
      [InquiryStatus.inProgress]: { label: 'In Progress', className: 'bg-blue-500 text-white' },
      [InquiryStatus.resolved]: { label: 'Resolved', className: 'bg-green-500 text-white' },
      [InquiryStatus.archived]: { label: 'Archived', className: 'bg-gray-500 text-white' },
    };

    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp));
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const statusValue = inquiry.status === InquiryStatus.new_ ? 'new' : inquiry.status;

  return (
    <Card className="border-gold/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-maroon">{inquiry.name}</CardTitle>
            <p className="text-sm text-maroon/60">{formatDate(inquiry.timestamp)}</p>
          </div>
          {getStatusBadge(inquiry.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-maroon">
          <Phone className="h-4 w-4" />
          <a href={`tel:${inquiry.phone}`} className="hover:text-gold">
            {inquiry.phone}
          </a>
        </div>
        <div className="flex items-start space-x-2 text-maroon">
          <MessageSquare className="mt-1 h-4 w-4 flex-shrink-0" />
          <p className="text-sm">{inquiry.message}</p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-gold/20">
        <Select value={statusValue} onValueChange={handleStatusChange}>
          <SelectTrigger className="flex-1 border-gold/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="inProgress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDelete}
          disabled={deleteInquiry.isPending}
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
