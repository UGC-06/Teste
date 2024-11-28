import tkinter as tk
from tkinter import ttk
from abc import ABC, abstractmethod


class Animal(ABC):
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def getNome(self):
        return self.nome

    def setNome(self, nome):
        self.nome = nome

    def getIdade(self):
        return self.idade

    def setIdade(self, idade):
        self.idade = idade

    @abstractmethod
    def mostrar(self):
        pass

class Cachorro(Animal):
    def __init__(self, nome, idade, porte):
        super().__init__(nome, idade)
        self.porte = porte

    def getPorte(self):
        return self.porte

    def setPorte(self, porte):
        self.porte = porte

    def mostrar(self):
        return f"Cachorro: Nome = {self.nome}, Idade = {self.idade}, Porte = {self.porte}"

class Gato(Animal):
    def __init__(self, nome, idade, raca):
        super().__init__(nome, idade)
        self.raca = raca

    def getRaca(self):
        return self.raca

    def setRaca(self, raca):
        self.raca = raca

    def mostrar(self):
        return f"Gato: Nome = {self.nome}, Idade = {self.idade}, Raça = {self.raca}"


animais = []


def cadastrar_animal():
    tipo = tipo_var.get()
    nome = nome_var.get()
    idade = idade_var.get()
    atributo = atributo_var.get()

    if tipo == "Cachorro":
        novo_animal = Cachorro(nome, idade, atributo)
    elif tipo == "Gato":
        novo_animal = Gato(nome, idade, atributo)
    else:
        return

    animais.append(novo_animal)
    atualizar_lista()
    nome_var.set("")
    idade_var.set("")
    atributo_var.set("")

def atualizar_lista():
    lista_texto.delete("1.0", tk.END)
    for animal in animais:
        lista_texto.insert(tk.END, animal.mostrar() + "\n")


janela = tk.Tk()
janela.title("Cadastro e Lista de Animais")


abas = ttk.Notebook(janela)


aba_cadastro = ttk.Frame(abas)
abas.add(aba_cadastro, text="Cadastro")


aba_lista = ttk.Frame(abas)
abas.add(aba_lista, text="Lista de Animais")


tipo_label = ttk.Label(aba_cadastro, text="Tipo:")
tipo_label.grid(row=0, column=0, padx=5, pady=5)
tipo_var = tk.StringVar(value="Cachorro")
tipo_menu = ttk.Combobox(aba_cadastro, textvariable=tipo_var, values=["Cachorro", "Gato"])
tipo_menu.grid(row=0, column=1, padx=5, pady=5)

nome_label = ttk.Label(aba_cadastro, text="Nome:")
nome_label.grid(row=1, column=0, padx=5, pady=5)
nome_var = tk.StringVar()
nome_entry = ttk.Entry(aba_cadastro, textvariable=nome_var)
nome_entry.grid(row=1, column=1, padx=5, pady=5)

idade_label = ttk.Label(aba_cadastro, text="Idade:")
idade_label.grid(row=2, column=0, padx=5, pady=5)
idade_var = tk.StringVar()
idade_entry = ttk.Entry(aba_cadastro, textvariable=idade_var)
idade_entry.grid(row=2, column=1, padx=5, pady=5)

atributo_label = ttk.Label(aba_cadastro, text="Porte/Raça:")
atributo_label.grid(row=3, column=0, padx=5, pady=5)
atributo_var = tk.StringVar()
atributo_entry = ttk.Entry(aba_cadastro, textvariable=atributo_var)
atributo_entry.grid(row=3, column=1, padx=5, pady=5)

cadastrar_btn = ttk.Button(aba_cadastro, text="Cadastrar", command=cadastrar_animal)
cadastrar_btn.grid(row=4, column=0, columnspan=2, pady=10)


lista_label = ttk.Label(aba_lista, text="Lista de Animais:")
lista_label.pack(pady=5)
lista_texto = tk.Text(aba_lista, height=15, width=50)
lista_texto.pack(pady=5)


abas.pack(expand=1, fill="both")


janela.mainloop()
