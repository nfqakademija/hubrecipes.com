<?php

namespace HubRecipes\YummlyClientBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('HubRecipesYummlyClientBundle:Default:index.html.twig', array('name' => $name));
    }
}
