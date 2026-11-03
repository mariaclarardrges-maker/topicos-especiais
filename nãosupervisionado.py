# Dados sem rótulo (ex: notas de provas da turma)
notas = [45, 50, 48, 90, 85, 92, 12, 15, 10]

# O algoritmo busca o ponto central (média) para dividir em dois grupos naturais
centroide = sum(notas) / len(notas)

grupo_baixo = [n for n in notas if n < centroide]
grupo_alto = [n for n in notas if n >= centroide]

print(f"[Não Supervisionado] Centroide calculado: {centroide:.1f}")
print("Grupo 1 (Desempenho Inferior):", grupo_baixo)
print("Grupo 2 (Desempenho Superior):", grupo_alto)
