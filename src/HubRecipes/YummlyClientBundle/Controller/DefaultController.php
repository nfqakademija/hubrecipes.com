<?php

namespace HubRecipes\YummlyClientBundle\Controller;

use HubRecipes\YummlyClientBundle\Service\SearchService;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        /** @var SearchService $search */
        $search = $this->get('hub_recipes_yummly_client.search_service');

        $results = $search->search(['sss' => 'sdfsf']);

        return $this->render('HubRecipesYummlyClientBundle:Default:index.html.twig', array('name' => $name));
    }
}
