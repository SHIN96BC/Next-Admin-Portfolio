'use client';

import Error500 from '@Src/features/maintenance/Error500';

// ==============================|| ERROR 500 - MAIN ||============================== //

// todo: testing of this page is pending. Need to figure out how to test this. Waiting to see
// if this comes automatically when some errors appears

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body>
        <Error500 />
      </body>
    </html>
  );
}
