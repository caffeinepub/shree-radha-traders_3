import { useState } from 'react';
import { useAddInquiry } from '../../hooks/useQueries';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const addInquiry = useAddInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      return;
    }

    try {
      await addInquiry.mutateAsync({ name, phone, message });
      setName('');
      setPhone('');
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="border-2 border-gold/30">
      <CardHeader>
        <CardTitle className="text-2xl text-maroon">Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="inquiry-name" className="text-maroon">
              Name *
            </Label>
            <Input
              id="inquiry-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="border-gold/30 focus:border-gold"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-phone" className="text-maroon">
              Phone *
            </Label>
            <Input
              id="inquiry-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              required
              className="border-gold/30 focus:border-gold"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-message" className="text-maroon">
              Message *
            </Label>
            <Textarea
              id="inquiry-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your requirements..."
              rows={5}
              required
              className="border-gold/30 focus:border-gold"
            />
          </div>

          <Button
            type="submit"
            disabled={addInquiry.isPending}
            className="w-full bg-gold text-maroon hover:bg-gold/90"
          >
            {addInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
