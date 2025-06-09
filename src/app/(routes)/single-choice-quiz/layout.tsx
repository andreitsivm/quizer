import QuizSettings from '@quizer/components/quiz-settings/quiz-settings';

export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <QuizSettings />
      {children}
    </main>
  );
}
