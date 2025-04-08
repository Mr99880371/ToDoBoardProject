import Card from "./index";

export default {
  title: "Components/Card",
  component: Card,
};

const Template = (args) => <Card {...args} />;

export const Ideias = Template.bind({});
Ideias.args = {
  title: "Nova ideia de projeto",
  description: "Pensar em um novo app para gestão de tempo.",
  dueDate: "2025-04-20",
  responsibles: ["Matheus Gomes", "Pedro Paulo", "Paulo"],
  status: "ideias",
  onClick: () => alert("Abrir modal de detalhes")
};

export const AfaZer = Template.bind({});
AfaZer.args = {
  ...Ideias.args,
  status: "a-fazer",
  dueDate: "2025-04-18"
};

export const Fazendo = Template.bind({});
Fazendo.args = {
  ...Ideias.args,
  status: "fazendo",
  dueDate: "2025-04-18"
};

export const Feito = Template.bind({});
Feito.args = {
  ...Ideias.args,
  status: "feito",
  dueDate: "2025-04-10"
};
