import random

posicao = 0
meta = 5

print("[Por Reforço] Iniciando tentativas do agente...")

for tentativa in range(1, 11):
  # Ação aleatória: 0 (ir para esquerda), 1 (ir para direita)
  acao = random.choice([0, 1])

  if acao == 1:
    posicao += 1
    recompensa = 10 if posicao == meta else 1
    print(f"Tentativa {tentativa}: Foi para Direita -> Posição {posicao}")
  else:
    posicao = max(0, posicao - 1)
    recompensa = -1
    print(f"Tentativa {tentativa}: Foi para Esquerda -> Posição {posicao}")

  if posicao == meta:
    print("🎉 O agente encontrou o objetivo e maximizou a recompensa!")
    break
