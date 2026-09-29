import { useState } from "react";
import { LzButton } from "../../src/LzButton";
import "../../src/styles/tokens.css";
import "../../src/LzButton/LzButton.css";

import {LzInput} from "../../src/LzInput"
import "../../src/LzInput/LzInput.css"
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function App() {
  const [salvando, setSalvando] = useState(false);
  const [cliques, setCliques] = useState(0);

  function salvar() {
    setSalvando(true);
    setTimeout(() => setSalvando(false), 2000);
  }

  const [teste, setTeste] = useState("")
  
  return (
    <>

      <div style={{ padding: 40, display: "none", flexDirection: "column", gap: 32, fontFamily: "system-ui" }}>
        <h1>Botões</h1>
        <section>
          <h3>Variantes</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <LzButton>Primary</LzButton>
            <LzButton variant="secondary">Secondary</LzButton>
            <LzButton variant="outline">Outline</LzButton>
            <LzButton variant="ghost">Ghost</LzButton>
            <LzButton variant="danger">Danger</LzButton>
          </div>
        </section>

        <section>
          <h3>Tamanhos</h3>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <LzButton size="sm">Small</LzButton>
            <LzButton size="md">Medium</LzButton>
            <LzButton size="lg">Large</LzButton>
          </div>
        </section>

        <section>
          <h3>Ícones</h3>
          <div style={{ display: "flex", gap: 12 }}>
            <LzButton leftIcon={<PlusIcon />}>Novo veículo</LzButton>
            <LzButton variant="outline" rightIcon={<ArrowIcon />}>Próximo</LzButton>
          </div>
        </section>

        <section>
          <h3>Estados</h3>
          <div style={{ display: "flex", gap: 12 }}>
            <LzButton loading={salvando} onClick={salvar}>
              {salvando ? "Salvando..." : "Salvar (2s)"}
            </LzButton>
            <LzButton disabled>Disabled</LzButton>
            <LzButton variant="outline" onClick={() => setCliques(cliques + 1)}>
              Cliques: {cliques}
            </LzButton>
          </div>
        </section>

        <section>
          <h3>Cores por props</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <LzButton color="#16a34a">Verde</LzButton>
            <LzButton color="#16a34a" hoverColor="#14532d">Hover customizado</LzButton>
            <LzButton color="#f59e0b" textColor="#000">Texto preto</LzButton>
            <LzButton color="#9333ea" variant="outline">Roxo outline</LzButton>
            <LzButton color="#9333ea" variant="ghost">Roxo ghost</LzButton>
            <LzButton color="#16a34a" borderColor="#14532d">Verde com borda escura</LzButton>
            <LzButton color="#16a34a" variant="outline" borderColor="#dc2626" >Outline com borda vermelha</LzButton>
            <LzButton
              color="#fff"
              textColor="#111"
              borderColor="#e5e7eb"
              hoverColor="#111"
              hoverTextColor="#fff"
              hoverBorderColor="#111"
            >
              Inverte no hover
            </LzButton>
          </div>
        </section>

        <section>
          <h3>className e style</h3>
          <div style={{ display: "flex", gap: 12 }}>
            <LzButton style={{ borderRadius: 999, paddingInline: 32 }}>Arredondado</LzButton>
            <LzButton style={{ fontWeight: 400, letterSpacing: 1 }}>Fonte fina</LzButton>
          </div>
        </section>

        <section style={{ maxWidth: 320 }}>
          <h3>Largura total</h3>
          <LzButton fullWidth leftIcon={<PlusIcon />}>Adicionar</LzButton>
        </section>
      </div>

      <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 32, fontFamily: "system-ui" }}>


        <LzInput
          label="Nome"
          placeholder="Nome"
          labelStyle={{fontSize: 19}}
          fullWidth={true}
          type="date"
          value={teste}
          onChange={(e) => setTeste(e.target.value)}
        />

        <div>
          {teste}
        </div>
      </div>
    </>
  );
}