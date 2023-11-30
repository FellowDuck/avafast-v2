import { useRef, useState } from "react";
import "./App.css";
import { Form, Button, Input, Grid, Box, Text } from "@react-bulk/web";
import { useToaster } from "@react-bulk/core";
import * as yup from "yup";
import ValidateHelper from "./helpers/ValidateHelper";

import ApiDefault from "./api/Api";

function App() {
  const formRef = useRef();
  const toaster = useToaster();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, data) => {
    const errors = await ValidateHelper.yup(data, {
      nome: yup.string().required("Nome é um campo obrigatório"),
      endereco: yup.string().required("Endereco é um campo obrigatório"),
      contato: yup.string().required("Contato é um campo obrigatório"),
      categoria: yup.string().required("Cateogira é um campo obrigatório"),
    });

    e.form.setErrors(errors);
    if (errors) return;

    setLoading(true);

    try {
      const response = await ApiDefault.post("/clients", data);
      if (response?.data?.status == "error") {
        toaster.open("Erro ao salvar");
      } else {
        toaster.open("Salvo com sucesso!");
        formRef.current.clear();
      }
    } catch (err) {
      toaster.open(err);
    }

    setLoading(false);
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit} border={2} corners={2} p={4}>
        <Text center variant="h1" bold mb={2}>
          AvaFast
        </Text>

        <Grid gap={3} width={700}>
          <Box xs={6}>
            <Input
              name="nome"
              label="Nome"
              placeholder="Digite o nome do restaurante"
            />
          </Box>

          <Box xs={6}>
            <Input
              name="endereco"
              label="Endereço"
              placeholder="Digite o endereço"
            />
          </Box>

          <Box xs={6}>
            <Input
              name="contato"
              label="Contato"
              placeholder="Digite o contato"
            />
          </Box>

          <Box xs={6}>
            <Input
              name="categoria"
              label="Categoria"
              placeholder="Digite a categoria"
            />
          </Box>

          <Box xs={12} mt={4}>
            <Button color="blue" loading={loading} type="submit">
              Enviar
            </Button>
          </Box>
        </Grid>
      </Form>
    </>
  );
}

export default App;
