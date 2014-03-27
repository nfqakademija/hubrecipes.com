<?php

namespace HubRecipes\FrontEndBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('HubRecipesFrontEndBundle:Default:index.html.twig');
    }
}
