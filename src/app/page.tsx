import { Routes } from '@quizer/config/app';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <h3>Explore</h3>
      <Link href={Routes.singleChoiceQuiz}>Single test</Link>
    </div>
  );
}
