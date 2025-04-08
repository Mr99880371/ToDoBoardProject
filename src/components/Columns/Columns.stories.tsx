import Columns from "./index";
import type { Meta, StoryFn } from "@storybook/react";

export default {
    title: "Components/Columns",
    component: Columns,
  } as Meta<typeof Columns>;

  const Template: StoryFn<typeof Columns> = (args) => <Columns {...args} />;

export const Ideias = Template.bind({});
Ideias.args = {
  columnId: "ideias",
  title: "Ideias",
  tasks: [
    {
      id: "1",
      title: "Nova ideia de projeto",
      description: "Pensar em um novo app para gestão de tempo.",
      dueDate: "2025-04-20",
      responsibles: ["Matheus Gomes", "Pedro Paulo", "Paulo"],
      status: "ideias",
    },
    {
      id: "2",
      title: "Planejar MVP",
      description: "Definir as funcionalidades básicas para o MVP.",
      dueDate: "2025-04-25",
      responsibles: ["Joana", "Lucas", "Bruna"],
      status: "ideias",
    },
  ],
};

export const AfaZer = Template.bind({});
AfaZer.args = {
  columnId: "a-fazer",
  title: "A fazer",
  tasks: [
    {
      id: "3",
      title: "Implementar autenticação",
      description: "Adicionar login com e-mail e senha.",
      dueDate: "2025-04-18",
      responsibles: ["Aline", "Carlos"],
      status: "a-fazer",
    },
  ],
};

export const Fazendo = Template.bind({});
Fazendo.args = {
  columnId: "fazendo",
  title: "Fazendo",
  tasks: [
    {
      id: "3",
      title: "Implementar autenticação",
      description: "Adicionar login com e-mail e senha.",
      dueDate: "2025-04-18",
      responsibles: ["Aline", "Carlos"],
      status: "fazendo",
    },
  ],
};

export const Feito = Template.bind({});
Feito.args = {
  columnId: "feito",
  title: "Feito",
  tasks: [
    {
      id: "4",
      title: "Criar estrutura inicial do projeto",
      description: "Configurar o ambiente e dependências.",
      dueDate: "2025-04-10",
      responsibles: ["Paulo", "Roberta"],
      status: "feito",
    },
  ],
};
