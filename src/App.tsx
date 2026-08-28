import { useState } from 'react';
import { supabase } from '@/lib/supabase';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('이름과 전화번호를 모두 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('event_registrations')
      .insert({ name: name.trim(), phone: phone.trim() });

    setSubmitting(false);

    if (insertError) {
      setError('신청 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    setSubmitted(true);
    setName('');
    setPhone('');
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md border border-black p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-6 border-2 border-black rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">✓</span>
          </div>
          <h1 className="text-xl font-bold mb-3">신청 완료</h1>
          <p className="text-sm text-gray-600 mb-8">
            이벤트 신청이 정상적으로 접수되었습니다.
          </p>
          <button
            onClick={handleReset}
            className="w-full border border-black bg-black text-white py-3 text-sm font-semibold hover:bg-white hover:text-black transition-colors"
          >
            다시 신청하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block border-2 border-black px-3 py-1 text-xs font-bold tracking-widest mb-4">
            EVENT
          </div>
          <h1 className="text-2xl font-bold mb-2">이벤트 신청서</h1>
          <p className="text-sm text-gray-500">
            아래 정보를 입력하고 신청해 주세요.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="border border-black p-6 space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-2"
            >
              이름 <span className="text-black">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="w-full border border-gray-400 px-3 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold mb-2"
            >
              전화번호 <span className="text-black">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full border border-gray-400 px-3 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm font-medium border border-black bg-gray-100 px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full border border-black bg-black text-white py-3 text-sm font-semibold hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? '신청 중...' : '신청하기'}
          </button>
        </form>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          입력하신 정보는 이벤트 운영 목적으로만 사용됩니다.
        </p>
      </div>
    </div>
  );
}

export default App;
