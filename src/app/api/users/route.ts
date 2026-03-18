export async function GET() {
  const users = [
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@gmail.com",
    },
    {
      id: 2,
      name: "Pelé",
      email: "pele@gmail.com",
    },
    {
      id: 3,
      name: "João Pereira",
      email: "joao@gmail.com",
    },
    {
      id: 4,
      name: "Francisca Oliveira",
      email: "francisca@gmail.com",
    },
  ];
  return Response.json(users);
}
