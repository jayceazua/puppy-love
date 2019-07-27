from django.shortcuts import render
# from django.http import HttpResponse

# Create your views here.
puppies = [
    {
        'title': 'Puppy Post 0',
        'description': 'First post content',
        'name': 'Thor',
        'breed': 'American Staffordshire Terrier',
        'dob': 'January 17, 2013',
        'gender': 'Male',
        # pictures
        'owner': 'Jayce Azua',
        'date_posted': 'July 26, 2019',
    },
    {
        'title': 'Puppy Post 1',
        'description': 'First post content',
        'name': 'Bella',
        'breed': 'American Staffordshire Terrier',
        'dob': 'January 17, 2013',
        'gender': 'Male',
        # pictures
        'owner': 'Jayce Azua',
        'date_posted': 'July 26, 2019',
    },
    {
        'title': 'Puppy Post 2',
        'description': 'First post content',
        'name': 'Freya',
        'breed': 'American Staffordshire Terrier',
        'dob': 'January 17, 2013',
        'gender': 'Male',
        # pictures
        'owner': 'Jayce Azua',
        'date_posted': 'July 26, 2019',
    },
]


def home(request):
    context = {
        'puppies': puppies
    }
    return render(request, 'puppy/home.html', context)


def about(request):
    return render(request, 'puppy/about.html', {'title': 'About this page madafaka!'})
