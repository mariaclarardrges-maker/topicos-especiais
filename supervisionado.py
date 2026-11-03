# Dados de treino: (peso_em_kg, rotulo) -> 0 = Gato, 1 = Cachorro
dados_treino = [(3.5, 0), (2.0, 0), (12.0, 1), (15.5, 1), (4.1, 0), (10.0, 1)]

# 1. Fase de Treinamento: O algoritmo calcula a média de peso de cada classe
pesos_gato = [p for p, r in dados_treino if r == 0]
pesos_cao = [p for p, r in dados_treino if r == 1]

limite_peso = (
    sum(pesos_gato) / len(pesos_gato) + sum(pesos_cao) / len(pesos_cao)
) / 2
print(f"[Supervisionado] Limite de decisão aprendido: {limite_peso:.1f} kg\n")


# 2. Fase de Predição (Inferência)
def prever_animal(peso):
  if peso > limite_peso:
    return "Cachorro"
  else:
    return "Gato"


print("Animal com 8.0 kg:", prever_animal(8.0))
print("Animal com 2.5 kg:", prever_animal(2.5))
