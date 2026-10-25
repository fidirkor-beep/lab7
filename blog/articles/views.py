
# Create your views here.
from .models import Article
from django.shortcuts import render, redirect
from django import template
from django.http import Http404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login


def archive(request):
    return render(request, 'archive.html', {"posts": Article.objects.all()})
def get_article(request, article_id):
    try:
        post = Article.objects.get(id=article_id)
        print("DEBUG found:", post.title)
        return render(request, 'article.html', {"post": post})
    except Article.DoesNotExist:
        print("DEBUG not found, count =", Article.objects.count())
        raise Http404
def create_post(request):
    if not request.user.is_anonymous:
        if request.method == "POST":
            form = {
                'text': request.POST["text"],
                'title': request.POST["title"],
            }

            if form["text"] and form["title"]:
                # проверка на уникальность названия
                if Article.objects.filter(title=form["title"]).exists():
                    form['errors'] = "Статья с таким названием уже существует"
                    return render(request, 'create_post.html', {'form': form})

                article = Article.objects.create(
                    text=form["text"],
                    title=form["title"],
                    author=request.user,
                )
                return redirect('get_article', article_id=article.id)
            else:
                form['errors'] = "Не все поля заполнены"
                return render(request, 'create_post.html', {'form': form})
        else:
            return render(request, 'create_post.html', {})
    else:
        raise Http404
def register(request):
    # если пользователь уже авторизован — незачем регистрироваться
    if request.user.is_authenticated:
        return redirect('archive')

    form = {}

    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        email = request.POST.get("email", "").strip()
        password = request.POST.get("password", "")

        form = {'username': username, 'email': email}

        # проверка на пустые поля
        if not username or not email or not password:
            form['errors'] = "Не все поля заполнены"
            return render(request, 'register.html', {'form': form})

        # проверка уникальности логина
        try:
            User.objects.get(username=username)
            form['errors'] = "Пользователь с таким именем уже есть"
            return render(request, 'register.html', {'form': form})
        except User.DoesNotExist:
            pass

        # создание пользователя
        User.objects.create_user(username, email, password)
        return redirect('archive')

    # GET — просто показать форму
    return render(request, 'register.html', {'form': form})
def login_view(request):
    form = {}

    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")

        form = {'username': username}

        # проверка на пустые поля
        if not username or not password:
            form['errors'] = "Не все поля заполнены"
            return render(request, 'login.html', {'form': form})

        # аутентификация
        user = authenticate(username=username, password=password)

        if user is None:
            form['errors'] = "Такого аккаунта не существует"
            return render(request, 'login.html', {'form': form})

        # авторизация
        login(request, user)
        return redirect('archive')

    # GET — показать форму
    return render(request, 'login.html', {'form': form})