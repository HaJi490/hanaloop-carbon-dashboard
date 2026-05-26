import { mockPosts } from "@/lib/mockData";
import Container from "@/components/shared/Container"
import Post from "@/components/elements/Post";

export default function page() {

  return (
    <Container>
      <Post data={mockPosts} />
    </Container>
  )
}
