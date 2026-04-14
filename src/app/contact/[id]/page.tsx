

import Profile from "@/components/ui/Profile";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  

  return (
<Profile id={id} />
  )
}
